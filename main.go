package main

import (
    "database/sql"
    "log"
    "net/http"

    "github.com/graphql-go/graphql"
    "github.com/graphql-go/handler"
    _ "github.com/lib/pq"
)

var db *sql.DB

// Initialize the database connection
func initDB() (*sql.DB, error) {
    connStr := "user=postgres password=LXusNNqumu7CKgLKeJXV dbname=psy_bot host=127.0.0.1 port=5432 sslmode=disable"

    db, err := sql.Open("postgres", connStr)
    if err != nil {
        return nil, err
    }
    return db, nil
}

// Define Order type
var orderType = graphql.NewObject(graphql.ObjectConfig{
    Name: "Order",
    Fields: graphql.Fields{
        "id": &graphql.Field{
            Type: graphql.ID,
        },
        "firstName": &graphql.Field{
            Type: graphql.String,
        },
        "lastName": &graphql.Field{
            Type: graphql.String,
        },
        "phoneNumber": &graphql.Field{
            Type: graphql.String,
        },
        "email": &graphql.Field{
            Type: graphql.String,
        },
        "city": &graphql.Field{
            Type: graphql.String,
        },
        "address": &graphql.Field{
            Type: graphql.String,
        },
    },
})

// Define Order Input type
var orderInputType = graphql.NewInputObject(graphql.InputObjectConfig{
    Name: "OrderInput",
    Fields: graphql.InputObjectConfigFieldMap{
        "firstName": &graphql.InputObjectFieldConfig{
            Type: graphql.String,
        },
        "lastName": &graphql.InputObjectFieldConfig{
            Type: graphql.String,
        },
        "phoneNumber": &graphql.InputObjectFieldConfig{
            Type: graphql.String,
        },
        "email": &graphql.InputObjectFieldConfig{
            Type: graphql.String,
        },
        "city": &graphql.InputObjectFieldConfig{
            Type: graphql.String,
        },
        "address": &graphql.InputObjectFieldConfig{
            Type: graphql.String,
        },
    },
})

// Define Product type
var productType = graphql.NewObject(graphql.ObjectConfig{
    Name: "Product",
    Fields: graphql.Fields{
        "name": &graphql.Field{
            Type: graphql.String,
        },
        "description": &graphql.Field{
            Type: graphql.String,
        },
        "image": &graphql.Field{
            Type: graphql.String,
        },
        "price": &graphql.Field{
            Type: graphql.Float,
        },
    },
})

// Sample data for products
var products = []map[string]interface{}{
    {
        "name":        "Miracle Moisture Potion",
        "description": "A magical serum that promises to make your skin feel like it just had a vacation.",
        "image":       "https://images.prom.ua/5895466173_w328_h250_krem-farba-dlya-volossya.jpg",
        "price":       35.00,
    },
    {
        "name":        "Glow-Up Face Mask",
        "description": "A mask that turns your face from “meh” to “wow!” in just 10 minutes.",
        "image":       "https://images.prom.ua/3410661288_w328_h250_vidnovlennya-volossya-boteks.jpg",
        "price":       45.00,
    },
    {
        "name":        "Kiss Me Quick Lip Balm",
        "description": "A lip balm so good, you’ll want to kiss yourself in the mirror.",
        "image":       "https://images.prom.ua/3758576376_w328_h250_keratin-dlya-slovyanskogo.jpg",
        "price":       12.00,
    },
    {
        "name":        "Wrinkle-Wizard Night Cream",
        "description": "A cream that works its magic while you sleep, turning wrinkles into dreams.",
        "image":       "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR7A13HpBjw2DHtX2Bz5hdatVbqLsnXtGe1N7EBJXqy2rHSWPKOmwdQJ_sI7Qacgn7s9kO9zSk619CWK5colBNDsn-G1cXc8OxJqQ0doMYO7dF_zTfdtajgLuOGeguw-cqKRt9mjw&usqp=CAc",
        "price":       60.00,
    },
    {
        "name":        "Spa Day in a Jar Scrub",
        "description": "An exfoliating scrub that makes you feel like you just had a spa day without leaving your bathroom.",
        "image":       "https://images.prom.ua/3714516963_maska-dlya-rostu.jpg",
        "price":       25.00,
    },
}

// Define Root Query
var rootQuery = graphql.NewObject(graphql.ObjectConfig{
    Name: "RootQuery",
    Fields: graphql.Fields{
        "orders": &graphql.Field{
            Type: graphql.NewList(orderType),
            Resolve: func(p graphql.ResolveParams) (interface{}, error) {
                rows, err := db.Query("SELECT id, first_name, last_name, phone_number, email, city, address FROM orders")
                if err != nil {
                    return nil, err
                }
                defer rows.Close()

                var orders []map[string]interface{}
                for rows.Next() {
                    var id int
                    var firstName, lastName, phoneNumber, email, city, address string
                    if err := rows.Scan(&id, &firstName, &lastName, &phoneNumber, &email, &city, &address); err != nil {
                        return nil, err
                    }
                    orders = append(orders, map[string]interface{}{
                        "id":          id,
                        "firstName":   firstName,
                        "lastName":    lastName,
                        "phoneNumber": phoneNumber,
                        "email":       email,
                        "city":        city,
                        "address":     address,
                    })
                }
                return orders, nil
            },
        },
        "latestOrder": &graphql.Field{
            Type: orderType,
            Resolve: func(p graphql.ResolveParams) (interface{}, error) {
                row := db.QueryRow("SELECT id, first_name, last_name, phone_number, email, city, address FROM orders ORDER BY id DESC LIMIT 1")
                var id int
                var firstName, lastName, phoneNumber, email, city, address string
                err := row.Scan(&id, &firstName, &lastName, &phoneNumber, &email, &city, &address)
                if err != nil {
                    return nil, err
                }
                return map[string]interface{}{
                    "id":          id,
                    "firstName":   firstName,
                    "lastName":    lastName,
                    "phoneNumber": phoneNumber,
                    "email":       email,
                    "city":        city,
                    "address":     address,
                }, nil
            },
        },
        "products": &graphql.Field{
            Type: graphql.NewList(productType),
            Resolve: func(p graphql.ResolveParams) (interface{}, error) {
                return products, nil
            },
        },
    },
})

// Define Root Mutation
var rootMutation = graphql.NewObject(graphql.ObjectConfig{
    Name: "RootMutation",
    Fields: graphql.Fields{
        "createOrder": &graphql.Field{
            Type: orderType,
            Args: graphql.FieldConfigArgument{
                "input": &graphql.ArgumentConfig{
                    Type: orderInputType,
                },
            },
            Resolve: func(p graphql.ResolveParams) (interface{}, error) {
                input, ok := p.Args["input"].(map[string]interface{})
                if !ok {
                    return nil, nil
                }

                // Insert order into the database
                var id int
                err := db.QueryRow(
                    `INSERT INTO orders (first_name, last_name, phone_number, email, city, address)
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
                    input["firstName"], input["lastName"], input["phoneNumber"], input["email"], input["city"], input["address"],
                ).Scan(&id)
                if err != nil {
                    return nil, err
                }

                return map[string]interface{}{
                    "id":          id,
                    "firstName":   input["firstName"],
                    "lastName":    input["lastName"],
                    "phoneNumber": input["phoneNumber"],
                    "email":       input["email"],
                    "city":        input["city"],
                    "address":     input["address"],
                }, nil
            },
        },
    },
})

// Define Schema
var schema, _ = graphql.NewSchema(graphql.SchemaConfig{
    Query:    rootQuery,
    Mutation: rootMutation,
})

func main() {
    var err error
    db, err = initDB()
    if err != nil {
        log.Fatalf("Error initializing database: %v", err)
    }

    h := handler.New(&handler.Config{
        Schema: &schema,
        Pretty: true,
        GraphiQL: true,
    })

    http.Handle("/graphql", h)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
