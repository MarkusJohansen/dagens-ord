package dagensord.db

import dagensord.model.Expression
import io.github.jan.supabase.postgrest.from

/**
 * Class for interacting with the Expression table in the database
 */
class ExpressionRepository {
    suspend fun getAll(): List<Expression> {
        return supabase.from("expressions").select().decodeList<Expression>()
    }
}