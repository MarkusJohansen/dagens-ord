package dagensord.plugins

import dagensord.db.ExpressionRepository
import dagensord.model.Expression
import dagensord.module
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.plugins.cors.routing.*
fun Application.configureRouting() {

    val expressionRepository = ExpressionRepository()
    var cachedExpression = Expression(0, "dummy expression", "dummy example", "dummy definition");

    install(CORS) {
        anyHost()
        allowMethod(HttpMethod.Get)
        allowMethod(HttpMethod.Post)
        allowMethod(HttpMethod.Put)
        allowMethod(HttpMethod.Delete)
        allowNonSimpleContentTypes = true
    }

    routing {
        get("/isalive"){
            call.respondText("ALIVE")
        }
        get("/") {
            try {
                val expressions = expressionRepository.getAll()
                call.respond(HttpStatusCode.OK, expressions.toString())
            } catch (e: Exception) {
                call.respond(HttpStatusCode.OK, e.message.toString())
            }
        }
        get("/new") {
            try {
                val expression = expressionRepository.getRandom(cachedExpression)
                cachedExpression = expression
                call.respond(HttpStatusCode.OK, expression.toString())
            } catch (e: Exception) {
                call.respond(HttpStatusCode.OK, e.message.toString())
            }
        }
    }
}
