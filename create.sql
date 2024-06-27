drop schema invoice_service cascade;

create schema invoice_service;

create table invoice_service.contract (
  id uuid not null default uuid_generate_v4() primary key,
  description text,
  amount numeric,
  periods integer,
  date timestamp
);

create table invoice_service.payment (
  id uuid not null default uuid_generate_v4() primary key,
  contract_id uuid references invoice_service.contract (id),
  amount numeric,
  date timestamp
);

insert into invoice_service.contract VALUES ('c556d362-3cd5-4751-b600-caa9bf861175','Prestação de serviço curso MBA',6000,12,'2024-01-01T01:00:00');
insert into invoice_service.payment VALUES ('cf60cca4-5f03-4f5e-8bff-8b332422bdfc','c556d362-3cd5-4751-b600-caa9bf861175',6000,'2024-01-02T01:00:00');