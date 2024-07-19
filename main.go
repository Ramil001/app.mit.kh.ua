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

func initDB() (*sql.DB, error) {
    connStr := "user=postgres password=LXusNNqumu7CKgLKeJXV dbname=psy_bot host=127.0.0.1 port=5432 sslmode=disable"

    db, err := sql.Open("postgres", connStr)
    if err != nil {
        return nil, err
    }
    return db, nil
}

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
    },
})

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
