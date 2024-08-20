using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedCascadeBehaviorOnUserDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Users_UserEmail",
                table: "Todos");

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Users_UserEmail",
                table: "Todos",
                column: "UserEmail",
                principalTable: "Users",
                principalColumn: "Email",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Users_UserEmail",
                table: "Todos");

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Users_UserEmail",
                table: "Todos",
                column: "UserEmail",
                principalTable: "Users",
                principalColumn: "Email",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
