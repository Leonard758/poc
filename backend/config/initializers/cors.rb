# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Accetta richieste da localhost:4200 (Angular)
    origins "http://localhost:4200", "http://127.0.0.1:4200"

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: false,
      max_age: 600
  end
end

# Logging per debug
Rails.logger.info "🔧 CORS configurato per accettare richieste da localhost:4200"