package dagensord.db

import dagensord.model.Expression
import io.github.jan.supabase.postgrest.*
import io.github.jan.supabase.postgrest.query.Order
import io.github.jan.supabase.postgrest.result.PostgrestResult
import kotlin.math.exp
import kotlin.math.log

/**
 * Class for interacting with the Expression table in the database
 */
class ExpressionRepository {
    suspend fun getAll(): List<Expression> {
        return supabase.from("expressions").select().decodeList<Expression>()
    }

    /**
     * Get random expression from DB
     * At the moment it only selects the first table entry
     */
    suspend fun getRandom(oldExpression: Expression): Expression {
        var newExpression = oldExpression
        while (newExpression == oldExpression ) //Ensures that in the rare case that we get the same expression, we will find a new one.
            newExpression = getAll().random() //horrible method, but the best for now. We have to get around that Kotlin ORM does not support random order
        return newExpression
    }

}