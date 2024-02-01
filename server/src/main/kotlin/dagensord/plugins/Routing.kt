package dagensord.plugins

import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.github.cdimascio.dotenv.dotenv

fun Application.configureRouting() {
    routing {
        get("/") {
            println("Hello world")
            val dotenv = dotenv()
            println(dotenv["URL"])
        }
    }
}
