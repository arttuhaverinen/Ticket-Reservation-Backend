# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copy everything
COPY . ./

# Restore the dependencies
RUN dotnet restore

# Build the application in Release mode and publish the output
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build-env /app/publish .

# Expose the port that your app listens on (if needed)
#EXPOSE 5001

# Run the application
# ENTRYPOINT ["dotnet", "TicketReservationApp.dll"]

#ENTRYPOINT ["sh", "-c", "while :; do sleep 1; done"]


ENTRYPOINT ["dotnet", "TicketReservationApp.dll"]