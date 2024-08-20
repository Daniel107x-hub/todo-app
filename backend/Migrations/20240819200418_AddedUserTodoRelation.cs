using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedUserTodoRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "picture",
                table: "Users",
                newName: "Picture");

            migrationBuilder.RenameColumn(
                name: "lastName",
                table: "Users",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "firstName",
                table: "Users",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "dateOfBirth",
                table: "Users",
                newName: "DateOfBirth");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "Users",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "Todos",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Todos",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "completed",
                table: "Todos",
                newName: "Completed");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Todos",
                newName: "Id");

            migrationBuilder.AddColumn<string>(
                name: "UserEmail",
                table: "Todos",
                type: "character varying(50)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Todos_UserEmail",
                table: "Todos",
                column: "UserEmail");

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Users_UserEmail",
                table: "Todos",
                column: "UserEmail",
                principalTable: "Users",
                principalColumn: "Email",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Users_UserEmail",
                table: "Todos");

            migrationBuilder.DropIndex(
                name: "IX_Todos_UserEmail",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "UserEmail",
                table: "Todos");

            migrationBuilder.RenameColumn(
                name: "Picture",
                table: "Users",
                newName: "picture");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Users",
                newName: "lastName");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Users",
                newName: "firstName");

            migrationBuilder.RenameColumn(
                name: "DateOfBirth",
                table: "Users",
                newName: "dateOfBirth");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Users",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Todos",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Todos",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Completed",
                table: "Todos",
                newName: "completed");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Todos",
                newName: "id");
        }
    }
}
