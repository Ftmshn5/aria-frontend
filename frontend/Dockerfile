FROM node:20-alpine

WORKDIR /app

# Eger npm install yapilacak package.json yoksa hata almamak icin once klasoru kopyalariz.
COPY . .

# Konteyner basladiginda npm install yapip baslatiriz. Bu sadece gelistirme ortamı için.
CMD ["sh", "-c", "if [ ! -d node_modules ]; then npm install; fi && npm run dev -- --host 0.0.0.0"]
