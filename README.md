
------------------------------------------------------------------------------------------------------------------------------------------------

npm install react-router-dom

npm install pg
npm install express
npm install cors

brew install postgressql

brew services start postgresql@14

brew services list

createdb -h localhost -p 5432 -U javierrojas myapp
/ $ psql -h localhost -p 5432 -U javierrojas


CREATE TABLE Inventory ( id SERIAL, product_name VARCHAR(50), category VARCHAR(50), price DECIMAL(10,2), quantity INT, sku VARCHAR(50), barcode BIGINT, supplier VARCHAR(50), last_restock_date DATE, low_stock_threshold INT, weight FLOAT, dimensions VARCHAR(50), status VARCHAR(50));

COPY Inventory(id, product_name, category, price, quantity, sku, barcode ,supplier, last_restock_date, low_stock_threshold, weight, dimensions, status) FROM '/Users/javierrojas/Desktop/MyProject/StoreFront/server/src/assets/inventory.csv' DELIMITER ',' CSV HEADER;


--------------------------------CHANGE PASSWORD REQUIREMENT HERE--------------------------------------------------------------------------------------
ls /usr/local/var/postgresql@15/pg_hba.conf


/c <--- change databases in sql