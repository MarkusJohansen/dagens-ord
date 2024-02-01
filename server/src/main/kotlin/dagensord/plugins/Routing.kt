package dagensord.plugins

import dagensord.db.supabase
import dagensord.model.Expression
import io.github.jan.supabase.postgrest.from
import io.github.jan.supabase.postgrest.query.Columns
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
                val expression = supabase.from("expressions").select().decodeList<Expression>()
                call.respond(HttpStatusCode.OK, expression)
                println(expression)
            } catch (e: Exception) {
                call.respond(HttpStatusCode.OK, e.message.toString())
            }
        }

        post("/insert_expressions") {
            try {
                val expression = Expression(expression = "Gutta tester", example = "", definition = "", id=9999)
                supabase.from("expression").insert(expression)
            } catch (e: Exception) {
                call.respond(HttpStatusCode.OK, e.message.toString())
            }
        }

    }
}
