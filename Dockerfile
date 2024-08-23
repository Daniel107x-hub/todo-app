# React Project build
FROM node:alpine as node-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Dotnet build
FROM mcr.microsoft.com/dotnet/sdk:8.0 as dotnet-build
WORKDIR /app
COPY backend/*.csproj ./
RUN dotnet restore
COPY backend/ .
RUN dotnet dev-certs https -ep ./https/aspnetapp.pfx -p 12345
RUN dotnet publish -c Release -o out

# Migrations
FROM dotnet-build as migrations
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"
ENTRYPOINT dotnet-ef database update

# FINAL IMAGE
FROM mcr.microsoft.com/dotnet/aspnet:8.0 as final
WORKDIR /app
COPY --from=dotnet-build /app/out .
COPY --from=dotnet-build /app/https ./https
COPY --from=node-build /app/build ./wwwroot
EXPOSE 3000
EXPOSE 3001
ENV ASPNETCORE_HTTP_PORTS 3000
ENV ASPNETCORE_HTTPS_PORTS 3001
ENV ASPNETCORE_Kestrel__Certificates__Default__Password 12345
ENV ASPNETCORE_Kestrel__Certificates__Default__Path ./https/aspnetapp.pfx
ENTRYPOINT ["dotnet", "backend.dll"]