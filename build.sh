#!/bin/bash
sudo apt install ffmpeg git
curl -fsSL https://bun.sh/install | bash
bun install -g hono nodemailer fluent-ffmpeg @fedify/cli
