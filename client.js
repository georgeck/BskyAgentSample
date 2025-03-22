import { BskyAgent } from '@atproto/api'
import 'dotenv/config'

const agent = new BskyAgent({
    service: 'https://bsky.social'
})

await agent.login({
    identifier: process.env.BSKY_USERNAME,
    password: process.env.BSKY_PASSWORD
})