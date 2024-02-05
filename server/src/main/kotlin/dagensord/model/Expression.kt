package dagensord.model

import kotlinx.serialization.Serializable

@Serializable
data class Expression (
    val id: Int,
    val expression: String,
    val example: String?,
    val definition: String?,
) {
    override fun toString(): String {
        return "Expression(\n${id}\n${expression}\n${example}\n${definition}\n)"
    }
}