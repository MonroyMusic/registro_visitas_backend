using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace registro_visitas_backend.Migrations
{
    /// <inheritdoc />
    public partial class changeCoords : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "coords",
                schema: "principal",
                table: "places",
                newName: "long");

            migrationBuilder.AddColumn<string>(
                name: "lat",
                schema: "principal",
                table: "places",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "lat",
                schema: "principal",
                table: "places");

            migrationBuilder.RenameColumn(
                name: "long",
                schema: "principal",
                table: "places",
                newName: "coords");
        }
    }
}
