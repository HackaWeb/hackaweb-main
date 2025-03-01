import { NextResponse } from "next/server";

async function getPayPalAccessToken() {
    const auth = Buffer.from(
        `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.NEXT_PUBLIC_PAYPAL_SECRET}`,
    ).toString("base64");

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_PAYPAL_API_URL}/v1/oauth2/token`,
        {
            method: "POST",
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials",
        },
    );

    const data = await response.json();
    return data.access_token;
}

export async function POST(req: Request) {
    try {
        const { orderAmount } = await req.json();
        const accessToken = await getPayPalAccessToken();

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_PAYPAL_API_URL}/v2/checkout/orders`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            amount: {
                                currency_code: "USD",
                                value: orderAmount,
                            },
                        },
                    ],
                }),
            },
        );

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("PayPal API Error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 },
        );
    }
}
