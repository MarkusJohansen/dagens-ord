package dagensord.plugins

import dagensord.db.supabase
import dagensord.model.Expression
import io.github.jan.supabase.postgrest.from
import io.ktor.server.application.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        get("/") {
            val expression = supabase.from("expressions").select().decodeSingle<Expression>()
            println(expression)

        }
    }
}
