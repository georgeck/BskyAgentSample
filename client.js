import {BskyAgent} from '@atproto/api'
import 'dotenv/config'


async function main() {
    const agent = new BskyAgent({
        service: 'https://bsky.social'
    })

    // Login to the service
    const response = await agent.login({
        identifier: process.env.BSKY_USERNAME, password: process.env.BSKY_PASSWORD
    });

    console.log(JSON.stringify(response, null, 2));

    // Create a new post
    const newPost = await agent.post({
        text: 'Hello world! I posted this via the API.', createdAt: new Date().toISOString()
    });
    console.log(newPost);

    // Read posts from the timeline
    let cursor = "";
    let count = 0;
    while (true) {
        const {data} = await agent.getTimeline({
            cursor,
            limit: 30,
        });

        const {feed: posts, cursor: nextCursor} = data;

        for (const post of posts) {
            console.log(JSON.stringify(post, null, 2));
        }

        if (!nextCursor || count++ > 5){
            break;
        }

        cursor = nextCursor;

        // Sleep for 2 seconds before fetching the next page to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

await main().catch(console.error)