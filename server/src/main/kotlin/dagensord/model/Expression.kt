package dagensord.model

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class Expression (
    val id: Int,
    val createdAt: LocalDateTime,
    val expression: String,
    val example: String,
    val definition: String
) {
    override fun toString(): String {
        return "Expression(\n${id}\n${createdAt}\n${expression}\n${example}\n${definition}\n)"
    }
}