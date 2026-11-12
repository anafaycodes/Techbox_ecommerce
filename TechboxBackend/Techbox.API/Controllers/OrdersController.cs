using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Techbox.API.Data;
using Techbox.API.Models;


namespace Techbox.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
    }

    // POST: api/orders
        [HttpPost]
    public async Task<IActionResult> CreateOrder(Order order)
    {
        decimal calculatedTotal = 0;
        foreach (var item in order.Items)
        {
            calculatedTotal += item.UnitPrice * item.Quantity;
            
            // DEDUCT STOCK
            var product = await _context.Products.FindAsync(item.ProductId);
            if (product != null)
            {
                product.StockQuantity -= item.Quantity;
                if (product.StockQuantity < 0) product.StockQuantity = 0; // Prevent negative stock
            }
        }
        order.TotalAmount = calculatedTotal;
        order.Status = "Pending";

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return Ok(new { orderId = order.Id, message = "Order placed successfully" });
    }

    // GET: api/orders (For Admin)
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        return await _context.Orders.Include(o => o.Items).OrderByDescending(o => o.CreatedAt).ToListAsync();
    }

    // PATCH: api/orders/{id}/status
    [Authorize]
    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] System.Text.Json.JsonElement payload)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null) return NotFound();

        if (payload.TryGetProperty("status", out var statusProp))
        {
            order.Status = statusProp.GetString() ?? "Pending";
            await _context.SaveChangesAsync();
            return Ok();
        }
        
        return BadRequest("Status property missing");
    }
}

// This class stays outside the controller, but inside the namespace
public class StatusUpdateRequest
{
    public string Status { get; set; } = string.Empty;
}