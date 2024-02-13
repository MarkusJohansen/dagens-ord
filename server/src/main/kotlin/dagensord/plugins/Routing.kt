package dagensord.plugins

import dagensord.db.ExpressionRepository
import dagensord.db.supabase
import dagensord.model.Expression
import io.github.jan.supabase.postgrest.from
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {

    val expressionRepository = ExpressionRepository()

    routing {
        get("/") {
            try {
                val expressions = expressionRepository.getAll()
                call.respond(HttpStatusCode.OK, expressions.toString())
            } catch (e: Exception) {
                call.respond(HttpStatusCode.OK, e.message.toString())
            }
        }
    }
}
