-- 1. Create Enums
create type user_role as enum ('customer', 'staff', 'admin');
create type customer_type as enum ('student', 'resident');
create type order_status as enum (
  'submitted',
  'intake_weighed',
  'washing',
  'drying_line',
  'folding_qc',
  'ready_for_pickup',
  'completed',
  'cancelled'
);
create type collection_method as enum ('pickup', 'dropoff');

-- 2. Profiles Table (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null,
  phone text unique not null,
  role user_role default 'customer'::user_role not null,
  customer_type customer_type default 'student'::customer_type not null,
  hostel_name text,
  room_number text,
  building_name text,
  house_number text,
  latitude double precision,
  longitude double precision,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 3. Orders Table
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  order_code text unique not null, -- e.g. PIN-1048
  user_id uuid references public.profiles(id) on delete set null,
  services text[] not null default array['washing']::text[],
  estimated_weight_kg numeric(4, 2) default 3.0,
  actual_weight_kg numeric(4, 2),
  price_per_kg numeric(6, 2) default 50.00,
  estimated_amount numeric(8, 2) not null,
  final_amount numeric(8, 2),
  status order_status default 'submitted'::order_status not null,
  collection_method collection_method default 'pickup'::collection_method not null,
  contact_phone text not null,
  pickup_instructions text,
  pickup_time text default '10:00',
  pickup_pin text, -- 4-digit security code for verification at handoff
  tag_code text,   -- physical site tag e.g. A-14
  shelf_slot text, -- physical storage slot e.g. S-3
  line_section text, -- hanging line zone
  photos_count int default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 4. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.orders enable row level security;

-- 5. Helper Function: Check if caller is Admin or Staff
create or replace function public.is_staff_or_admin(user_id uuid)
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = user_id and role in ('staff', 'admin')
  );
$$ language sql security definer;

-- 6. RLS Policies for Profiles
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id or public.is_staff_or_admin(auth.uid()));

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Service role or signup can insert profile"
  on public.profiles for insert
  with check (auth.uid() = id or public.is_staff_or_admin(auth.uid()));

-- 7. RLS Policies for Orders
create policy "Customers can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id or public.is_staff_or_admin(auth.uid()));

create policy "Customers can insert their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "Staff and Admins can update any order"
  on public.orders for update
  using (public.is_staff_or_admin(auth.uid()));

-- 8. Auto-generate human-friendly order code (PIN-XXXX) & 4-digit pickup PIN
create or replace function public.generate_order_meta()
returns trigger as $$
begin
  if new.order_code is null or new.order_code = '' then
    new.order_code := 'PIN-' || floor(1000 + random() * 9000)::text;
  end if;
  if new.pickup_pin is null or new.pickup_pin = '' then
    new.pickup_pin := floor(1000 + random() * 9000)::text;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger tr_generate_order_meta
before insert on public.orders
for each row
execute function public.generate_order_meta();