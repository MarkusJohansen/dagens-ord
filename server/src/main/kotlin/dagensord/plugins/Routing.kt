package dagensord.plugins

import dagensord.db.supabase
import dagensord.model.Expression
import io.github.jan.supabase.postgrest.from
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respond("Hello world")
        }

        get("/expressions") {
            try {
                val expressions = supabase.from("expressions").select().decodeList<Expression>()
                call.respond(HttpStatusCode.OK, expressions.toString())
                println(expressions.toString())
            } catch (e: Exception) {
                call.respond(HttpStatusCode.OK, e.message.toString())
            }
        }

    }
}
