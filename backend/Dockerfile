# Build stage
FROM golang:1.24.5-alpine as builder
WORKDIR /app
COPY . .
RUN go build -o hearth-backend ./cmd/server

# Runtime stage
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/hearth-backend .
EXPOSE 8080
CMD ["./hearth-backend"]
