using Microsoft.EntityFrameworkCore;
using Techbox.API.Models;

namespace Techbox.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products { get; set; }
}