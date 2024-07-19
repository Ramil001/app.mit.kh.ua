package main

import (
    "github.com/graphql-go/graphql"
    "github.com/graphql-go/handler"
    "net/http"
)

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

var rootQuery = graphql.NewObject(graphql.ObjectConfig{
    Name: "RootQuery",
    Fields: graphql.Fields{
        "products": &graphql.Field{
            Type: graphql.NewList(productType),
            Resolve: func(p graphql.ResolveParams) (interface{}, error) {
                return products, nil
            },
        },
    },
})

var schema, _ = graphql.NewSchema(graphql.SchemaConfig{
    Query: rootQuery,
})

func main() {
    h := handler.New(&handler.Config{
        Schema: &schema,
        Pretty: true,
        GraphiQL: true,
    })

    http.Handle("/graphql", h)
    http.ListenAndServe(":8080", nil)
}
