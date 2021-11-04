module.exports = mongoose => {
    return mongoose.model(
        "orders",
        mongoose.Schema(
            {
                name: String,
                email: String,
                phone: String,
                stats: Array,
            },
            {
                timestamps: true,
                versionKey: false
            }
        )
    );
};