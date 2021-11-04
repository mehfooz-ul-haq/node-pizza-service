module.exports = mongoose => {
    return mongoose.model(
        "staff",
        mongoose.Schema(
            {
                name: String,
                type: String,
                timeToTakeInSeconds: Number,
                isBusy: {type: Boolean, default: false},
            },
            {
                timestamps: true,
                versionKey: false
            }
        )
    );
};