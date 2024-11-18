#!/bin/bash
sudo apt install ffmpeg git
curl -fsSL https://bun.sh/install | bash
bun install -g lowdb hono nodemailer fluent-ffmpeg
