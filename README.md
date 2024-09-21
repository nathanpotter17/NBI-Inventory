## Overview - Natl Bridge Inventory

Hello! Welcome to the Natl Bridge Inventory for Pennsylvania.

This repository contains the data and code used to create a way to query the Natl Bridge Inventory for Pennsylvanian Bridge Information.

On the `main branch`, you will find a `NextJS` project that
uses a `PostgreSQL` database and `Prisma ORM` to query the data I have loaded using two different endpoints, `api/seedData`, and `api/mapLocation`.

On the `pyEnv branch`, you will find a Python script and a Jupyter Notebook file that uses Pandas & Regex libraries to better understand the shape of the data and to create a mock-schema file with. This schema.txt file was used as the foundation for DB model creation, and as a continous reference to the data types and values that were present are present.

## Schema - PostgreSQL + Prisma ORM

The database contains two tables: one for all PA bridge data, and one for location data that is effectively used as a lookup table for general bridge data. The bridge table contains information about each bridge in Pennsylvania, and the location table contains information about each bridges' id, latitude, and longitude.

## API Endpoints

`api/seedData` creates a readable stream of csv data that is then parsed and loaded into an array of type any. I chose this pattern to use the base table as the main datastore, to create other associative tables from. I then use Prisma to load the data into the database, effectively typecasting the data into the correct types provided for the bridge schema, without explicitly creating a new object comprised of all 123 typedefs.

`api/mapLocation` queries the bridge table and returns the id and location data (latitude and longitude) for each bridge in the database.
Then, an array of objects is created with that data to seed the location table with the relevant bridge's UID and typecast location values, effectively syncing the two tables together by UID. This table helps to perform numeric operations on location data.

`api/structure` works by querying the bridge table and returning all the data associated with a specific bridge. This is done by querying the bridge table by `STRUCTURE_NAME_008`, and returning the data associated with that 15-20 digit UUID.

`api/location` works by querying the location table and returning all the data associated with a specific location, given a certain microdegrees of radius, which is 1.5 miles for this example. This is done by querying the location table by `Latitude x Longitude` (`LAT_016, and LONG_017`) where LAT and LONG are used to create a search radius of `SEARCH_RADIUS_MICRODEGREES`, then find what records are (`gte` and `lte`) within the microdegree values. After receiving structure data, I iterate over query result that contains the id of the structures to return information for, finally returning a list of structures that are within the search radius, and some key information about them, such as the structure name, year built, operational status, and the date of last inspection.
