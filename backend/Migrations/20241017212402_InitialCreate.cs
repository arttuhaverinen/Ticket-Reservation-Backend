using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TicketReservationApp.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Discriminator = table.Column<string>(type: "character varying(21)", maxLength: 21, nullable: false),
                    TicketsId = table.Column<int>(type: "integer", nullable: true),
                    PostsId = table.Column<int>(type: "integer", nullable: true),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PostTitle = table.Column<string>(type: "text", nullable: false),
                    PostContent = table.Column<string>(type: "text", nullable: false),
                    PostType = table.Column<string>(type: "text", nullable: false),
                    AppUserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Timetables",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "interval", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "interval", nullable: false),
                    Price = table.Column<double>(type: "double precision", nullable: false),
                    PriceDiscount = table.Column<double>(type: "double precision", nullable: true),
                    Departure = table.Column<string>(type: "text", nullable: false),
                    Destination = table.Column<string>(type: "text", nullable: false),
                    Day = table.Column<List<string>>(type: "text[]", nullable: false),
                    Cancelled = table.Column<List<DateTime>>(type: "timestamp without time zone[]", nullable: false),
                    AppUserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Timetables", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Timetables_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StartTime = table.Column<TimeSpan>(type: "interval", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "interval", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Expired = table.Column<bool>(type: "boolean", nullable: false),
                    Departure = table.Column<string>(type: "text", nullable: false),
                    Destination = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Seat = table.Column<int>(type: "integer", nullable: false),
                    TimetablesId = table.Column<int>(type: "integer", nullable: false),
                    AppUserId = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tickets_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Tickets_Timetables_TimetablesId",
                        column: x => x.TimetablesId,
                        principalTable: "Timetables",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "775e1c20-3b1d-4ee3-a457-0ed07368099a", null, "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "c895e2ba-889b-4388-9c6a-df71363e9278", 0, "d7a03135-6015-4730-b31c-e1ef2e66c97c", "ApplicationUser", "admin@example.com", true, false, null, "ADMIN@EXAMPLE.COM", "ADMIN@EXAMPLE.COM", "AQAAAAIAAYagAAAAEJHryrfRprW1gTDFV4h5mQXVkX7s28+dm286MzMpDYpawekT7lXMjtVByfM19vkY0g==", null, false, "", false, "admin@example.com" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "775e1c20-3b1d-4ee3-a457-0ed07368099a", "c895e2ba-889b-4388-9c6a-df71363e9278" });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "AppUserId", "PostContent", "PostTitle", "PostType" },
                values: new object[,]
                {
                    { 1, "c895e2ba-889b-4388-9c6a-df71363e9278", "seed 1", "first post", "info" },
                    { 2, "c895e2ba-889b-4388-9c6a-df71363e9278", "seed 2", "second post", "warning" },
                    { 3, "c895e2ba-889b-4388-9c6a-df71363e9278", "seed 3", "third post", "info" }
                });

            migrationBuilder.InsertData(
                table: "Timetables",
                columns: new[] { "Id", "AppUserId", "Cancelled", "Date", "Day", "Departure", "Destination", "EndTime", "Price", "PriceDiscount", "StartTime" },
                values: new object[,]
                {
                    { 1, "c895e2ba-889b-4388-9c6a-df71363e9278", new List<DateTime>(), new DateTime(2024, 10, 18, 0, 24, 1, 991, DateTimeKind.Utc).AddTicks(8815), new List<string> { "monday", "tuesday", "wednesday", "thursday", "friday" }, "Joensuu", "Tampere", new TimeSpan(0, 9, 0, 0, 0), 29.989999999999998, null, new TimeSpan(0, 9, 0, 0, 0) },
                    { 2, "c895e2ba-889b-4388-9c6a-df71363e9278", new List<DateTime>(), new DateTime(2024, 10, 18, 0, 24, 1, 991, DateTimeKind.Utc).AddTicks(8867), new List<string> { "saturday", "sunday" }, "Joensuu", "Kuopio", new TimeSpan(0, 9, 0, 0, 0), 19.989999999999998, null, new TimeSpan(0, 9, 0, 0, 0) },
                    { 3, "c895e2ba-889b-4388-9c6a-df71363e9278", new List<DateTime>(), new DateTime(2024, 10, 18, 0, 24, 1, 991, DateTimeKind.Utc).AddTicks(8873), new List<string> { "saturday", "sunday" }, "Joensuu", "Kuopio", new TimeSpan(0, 17, 0, 0, 0), 29.989999999999998, null, new TimeSpan(0, 17, 0, 0, 0) },
                    { 4, "c895e2ba-889b-4388-9c6a-df71363e9278", new List<DateTime>(), new DateTime(2024, 10, 18, 0, 24, 1, 991, DateTimeKind.Utc).AddTicks(8973), new List<string> { "monday", "tuesday", "wednesday", "thursday", "friday" }, "Joensuu", "Nurmes", new TimeSpan(0, 9, 0, 0, 0), 14.99, 10.99, new TimeSpan(0, 9, 0, 0, 0) }
                });

            migrationBuilder.InsertData(
                table: "Tickets",
                columns: new[] { "Id", "AppUserId", "Date", "Departure", "Destination", "EndTime", "Expired", "Name", "Seat", "StartTime", "Status", "TimetablesId" },
                values: new object[,]
                {
                    { 1, "c895e2ba-889b-4388-9c6a-df71363e9278", new DateTime(2024, 9, 4, 9, 0, 0, 0, DateTimeKind.Utc), "Joensuu", "Tampere", new TimeSpan(0, 9, 0, 0, 0), false, "arttu", 12, new TimeSpan(0, 9, 0, 0, 0), "paid", 1 },
                    { 2, "c895e2ba-889b-4388-9c6a-df71363e9278", new DateTime(2024, 9, 4, 9, 0, 0, 0, DateTimeKind.Utc), "Joensuu", "Tampere", new TimeSpan(0, 9, 0, 0, 0), false, "juhani", 13, new TimeSpan(0, 9, 0, 0, 0), "paid", 1 },
                    { 3, "c895e2ba-889b-4388-9c6a-df71363e9278", new DateTime(2024, 9, 5, 9, 0, 0, 0, DateTimeKind.Utc), "Joensuu", "Tampere", new TimeSpan(0, 9, 0, 0, 0), false, "name", 5, new TimeSpan(0, 9, 0, 0, 0), "paid", 1 },
                    { 4, "c895e2ba-889b-4388-9c6a-df71363e9278", new DateTime(2024, 9, 8, 9, 0, 0, 0, DateTimeKind.Utc), "Joensuu", "Kuopio", new TimeSpan(0, 17, 0, 0, 0), false, "name", 10, new TimeSpan(0, 17, 0, 0, 0), "paid", 2 },
                    { 5, "c895e2ba-889b-4388-9c6a-df71363e9278", new DateTime(2024, 9, 7, 9, 0, 0, 0, DateTimeKind.Utc), "Joensuu", "Kuopio", new TimeSpan(0, 9, 0, 0, 0), false, "name", 9, new TimeSpan(0, 9, 0, 0, 0), "paid", 2 },
                    { 6, "c895e2ba-889b-4388-9c6a-df71363e9278", new DateTime(2024, 9, 7, 9, 0, 0, 0, DateTimeKind.Utc), "Joensuu", "Kuopio", new TimeSpan(0, 17, 0, 0, 0), false, "name", 12, new TimeSpan(0, 17, 0, 0, 0), "paid", 3 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_AppUserId",
                table: "Posts",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_AppUserId",
                table: "Tickets",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_TimetablesId",
                table: "Tickets",
                column: "TimetablesId");

            migrationBuilder.CreateIndex(
                name: "IX_Timetables_AppUserId",
                table: "Timetables",
                column: "AppUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Timetables");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
