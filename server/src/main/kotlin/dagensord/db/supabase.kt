package dagensord.db

import io.github.jan.supabase.createSupabaseClient
import io.github.jan.supabase.postgrest.Postgrest
import io.github.jan.supabase.postgrest.PropertyConversionMethod
import io.github.jan.supabase.serializer.KotlinXSerializer
import io.github.cdimascio.dotenv.dotenv

val dotenv = dotenv()

val supabase = createSupabaseClient(
    supabaseUrl = dotenv["URL"],
    supabaseKey = dotenv["PUBLIC_ANON_KEY"]
) {
    defaultSerializer = KotlinXSerializer()
    install(Postgrest) {
        defaultSchema = "schema" // default: "public"
        propertyConversionMethod = PropertyConversionMethod.SERIAL_NAME // default: PropertyConversionMethod.CAMEL_CASE_TO_SNAKE_CASE
    }
}
