-- TODO Task 3
drop database if exists ecommerce;

create database ecommerce;

use ecommerce;

create table purchase_order (
   orderId char(26) not null,
   created_on timestamp default current_timestamp,
   name varchar(64) not null,
   address varchar(256) not null,
   priority boolean,
   comments varchar(64),

   primary key(orderId)
);

create table line_item (
   lineItemId int auto_increment not null,
   productId varchar(255) not null, 
   name varchar(256) not null,
   quantity int not null,
   price decimal(10, 2) not null,
   orderId char(26) not null,

   primary key(lineItemId),
   constraint fk_order_id foreign key(orderId) references purchase_order(orderId)
);

-- grant all privileges on ecommerce.* to fred@'%';

-- flush privileges;