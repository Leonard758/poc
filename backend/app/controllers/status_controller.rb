class StatusController < ApplicationController
  def index
    # Log per debug
    Rails.logger.info "📡 Richiesta ricevuta da: #{request.origin}"
    Rails.logger.info "📋 Headers: #{request.headers.env.select { |k,v| k.start_with?('HTTP_') }}"
    
    # Headers CORS espliciti (backup)
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = '*'
    
    render json: { 
      message: "✅ Connessione riuscita: Rails e Angular si parlano!",
      timestamp: Time.now.to_s,
      origin: request.origin
    }
  end
end