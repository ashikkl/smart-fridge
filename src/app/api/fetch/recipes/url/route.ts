import axios from "axios";
import axiosRetry from "axios-retry";
import { NextResponse } from "next/server";

function getSpoonacularCredentials(): {
    SPOONACULAR_API_KEY: string;
} {
    const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
    if (!SPOONACULAR_API_KEY || SPOONACULAR_API_KEY.length === 0) {
        throw new Error("Missing SPOONACULAR_API_KEY");
    }

    return { SPOONACULAR_API_KEY };
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const ingredients = searchParams.get('ingredients') || '';
    let config = {
        timeOut: 5000,
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.spoonacular.com/recipes/findByIngredients?ingredients=%${ingredients}&number=5&ignorePantry=true&apiKey=${getSpoonacularCredentials().SPOONACULAR_API_KEY
            }`,
        headers: {},
    };

    const client = axios.create(config)
    axiosRetry(client, {
        retries: 2,
        retryDelay: axiosRetry.exponentialDelay,
    });

    const recipes = await client
        .request(config)
        .then((response) => {
            const recipes = response.data.map((recipe: any) => ({
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                missingIngredients: recipe.missedIngredientCount,
            }));
            console.log(response.data);
            return recipes;
        })
        .catch((error) => {
            console.error("Error fetching recipes:", error);
        });

    if (recipes.length === 0) {
        // Handle case when no recipes are found
        return NextResponse.json({ recipes: [] });
    }

    // Continue with normal processing of recipes
    return NextResponse.json({ recipes });

}