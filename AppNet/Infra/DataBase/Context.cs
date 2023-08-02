using Microsoft.EntityFrameworkCore;
using AppNet.Model;

namespace AppNet.Infra.DataBase;

public class Context : DbContext
{
    public DbSet<Category> Categories { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite( "Data Source=LocalDatabase.db");
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>().HasKey(x => x.Id);
        modelBuilder.Entity<Category>().Property(x => x.Nome).HasMaxLength(80).IsRequired();
    }
}