
// Define variables for sensitive information
variable "db_password" {
    description = "Password for the database"
    type        = string
}
 
variable "region" {
    description = "AWS region"
    type        = string
    default     = "eu-west-1"
}
 
variable "profile" {
    description = "AWS profile"
    type        = string
    default     = "rotenda"
}
 
  // Configure AWS provider
provider "aws" {
    region  = var.region
    profile = var.profile
}
 
  // Define VPC
resource "aws_vpc" "mainVPC" {
    cidr_block            = "10.0.0.0/16"
    enable_dns_hostnames  = true
 
    tags = {
      Name         = "main"
      owner        = "arinaho.muleba@bbd.co.za"
      created-using = "terraform"
    }
}
 
 
  // Define Internet Gateway
resource "aws_internet_gateway" "gw" {
    vpc_id = aws_vpc.mainVPC.id
 
    tags = {
      Name         = "mainGW"
      owner        = "arinaho.muleba@bbd.co.za"
      created-using = "terraform"
    }
}
 
  // Add route to default route table
resource "aws_route" "add_to_default_route" {
    route_table_id         = aws_vpc.mainVPC.default_route_table_id
    destination_cidr_block = "0.0.0.0/0"
    gateway_id             = aws_internet_gateway.gw.id
}
 
  // Define subnets
resource "aws_subnet" "subnet" {
    count            = 2
    vpc_id           = aws_vpc.mainVPC.id
    cidr_block       = cidrsubnet(aws_vpc.mainVPC.cidr_block, 8, count.index)
    availability_zone = "eu-west-1${element(["a", "b"], count.index)}"
 
    tags = {
      Name         = "subnet${count.index + 1}"
      owner        = "arinaho.muleba@bbd.co.za"
      created-using = "terraform"
    }
}
 
  // Group subnets for RDS instance
resource "aws_db_subnet_group" "database_subnet_group" {
    name         = "database-subnets"
    subnet_ids   = aws_subnet.subnet[*].id
    description  = "subnets for database instance"
 
    tags = {
      Name         = "databasesubnets"
      owner        = "arinaho.muleba@bbd.co.za"
      created-using = "terraform"
    }
}
 
  // Define security group for database
resource "aws_security_group" "webserver_security_group" {
    name        = "webserver security group"
    description = "Enable http access on port 80"
    vpc_id      = aws_vpc.mainVPC.id
 
    ingress {
      description      = "http access"
      from_port        = 80
      to_port          = 80
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
    }
 
    egress {
      from_port        = 0
      to_port          = 0
      protocol         = -1
      cidr_blocks      = ["0.0.0.0/0"]
    }
 
    tags = {
      Name          = "webserver_security_group"
      owner         = "arinaho.muleba@bbd.co.za"
      created-using = "terraform"
    }
}
 
 
  // Define security group for database
resource "aws_security_group" "rds_security_group" {
    name        = "database security group"
    description = "Enable access on port 3306"
    vpc_id      = aws_vpc.mainVPC.id
 
    ingress {
      description      = "MySQL access"
      from_port        = 5432
      to_port          = 5432
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
    }
 
    egress {
      from_port        = 0
      to_port          = 0
      protocol         = -1
      cidr_blocks      = ["0.0.0.0/0"]
    }
 
    tags = {
      Name          = "database_security_group"
      owner         = "arinaho.muleba@bbd.co.za"
      created-using = "terraform"
    }
}
 
// Create RDS instance with PostgreSQL
resource "aws_db_instance" "db_instance" {
    engine                  = "postgres"
    engine_version          = "16.1"
    multi_az                = true
    identifier              = "across-the-spiderverse"
    username                = "postgres"
    password                = var.db_password
    instance_class          = "db.t3.micro"
    allocated_storage       = 20 // PostgreSQL requires minimum of 20 GB storage
    db_subnet_group_name    = aws_db_subnet_group.database_subnet_group.name
    vpc_security_group_ids  = [aws_security_group.database_security_group.id]
    skip_final_snapshot     = true
    publicly_accessible     = true
    port                    = 5432 
 
    tags = {
      Name         = "spiderman-trivia"
      owner        = "arinaho.muleba@bbd.co.za"
      created-using = "terraform"
    }
}
