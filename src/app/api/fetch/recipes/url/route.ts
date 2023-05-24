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
    const recipeId = searchParams.get('id') || '';
    let config = {
        timeOut: 5000,
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${getSpoonacularCredentials().SPOONACULAR_API_KEY
            }`,
        headers: {},
    };

    const client = axios.create(config)
    axiosRetry(client, {
        retries: 1,
        retryDelay: axiosRetry.exponentialDelay,
    });

    const spoonacularSourceUrl = await client
        .request(config)
        .then((response) => {
            return response.data.spoonacularSourceUrl;
        })
        .catch((error) => {
            console.error("Error fetching recipe url:", error);
        });

    if (spoonacularSourceUrl.length === 0) {
        // Handle case when no recipes are found
        return NextResponse.json({ spoonacularSourceUrl: [] });
    }

    // Continue with normal processing of recipes
    return NextResponse.json({ spoonacularSourceUrl });

}