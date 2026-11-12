using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Techbox.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImagesController : ControllerBase
{
    private readonly IWebHostEnvironment _environment;

    public ImagesController(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    [Authorize]
    [HttpPost("upload")]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");

        // Generate a unique filename to prevent overwriting
        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        
        // Path to the wwwroot/images folder
        var folderPath = Path.Combine(_environment.WebRootPath, "images");
        
        // Ensure folder exists
        if (!Directory.Exists(folderPath))
            Directory.CreateDirectory(folderPath);

        var filePath = Path.Combine(folderPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        // Return the URL so React can save it to the database
        var url = $"{Request.Scheme}://{Request.Host}/images/{fileName}";
        return Ok(new { Url = url });
    }
}