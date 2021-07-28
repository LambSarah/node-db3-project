-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT ProductName, CategoryName FROM [Product] as p
	LEFT JOIN Category as c
	ON p.d = c.Id
	GROUP BY p.ProductName

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

SELECT o.Id, s.CompanyName 
FROM [Order] as o
	LEFT JOIN Shipper as s
	ON o.ShipVia = s.Id
	WHERE(o.OrderDate < '2012-08-09')

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT ProductName FROM [Product] as p
	LEFT JOIN [OrderDetail] as o
	ON p.Id = o.ProductId
	WHERE(o.OrderId = 10151)
-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT o.Id, c.CompanyName, e.LastName from [Order] as o
	INNER JOIN [Customer] as c 
	ON o.CustomerId = c.Id
	INNER JOIN [Employee] as e
	on o.EmployeeId = e.Id