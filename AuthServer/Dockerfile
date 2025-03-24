FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

ENV ASPNETCORE_URLS=http://+:80

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["AuthServer/AuthServer.csproj", "AuthServer/"] # עדכן את הנתיב אם צריך
RUN dotnet restore "AuthServer/AuthServer.csproj"
COPY . . # מעתיק את כל הקבצים לתוך הקונטיינר
WORKDIR "/src/AuthServer" # נכנס לתיקיית האפליקציה
RUN dotnet build "AuthServer.csproj" -c $configuration -o /app/build

FROM build AS publish
RUN dotnet publish "AuthServer.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AuthServer.dll"] # עדכן את השם אם צריך
