drop table if exists usuarios;

drop table if exists aulas;

drop table if exists modulos;

create table usuarios (
	id serial primary key,
  	nome text not null,
  	email text not null unique,
  	senha text not null
);

create table modulos (
	id serial primary key,
  	nome text not null
);

create table aulas (
	id serial primary key,
  	modulo_id int not null references modulos(id),
  	nome text not null,
  	data timestamp not null,
  	modulo text not null
);