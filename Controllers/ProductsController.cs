namespace TicketReservationApp.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketReservationApp.Data;

using System;
using TicketReservationApp.Models;

[ApiController]
[Route("[controller]")]
public class ProductsController : ControllerBase
{
    private readonly DataContext _appDbContext;

    public ProductsController(DataContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    [HttpPost]
    public async Task<IActionResult> Create(Tickets productToCreate)
    {
        //productToCreate.Id = Guid.NewGuid().ToString();

        await _appDbContext.AddAsync(productToCreate);

        await _appDbContext.SaveChangesAsync();

        return Ok(productToCreate);
    }

    [HttpGet]
    public async Task<IEnumerable<Tickets>> Get()
    {
        return await _appDbContext.Tickets.ToListAsync();
    }

    [HttpPut]
    public async Task<IActionResult> Update(Tickets updatedProduct)
    {
        _appDbContext.Update(updatedProduct);

        await _appDbContext.SaveChangesAsync();

        return Ok(updatedProduct);
    }

    [HttpDelete]
    [Route("{productToDeleteId}")]
    public async Task<IActionResult> Update(string productToDeleteId)
    {
        var productToDelete = await _appDbContext.Tickets.FindAsync(productToDeleteId);

        _appDbContext.Remove(productToDelete);

        await _appDbContext.SaveChangesAsync();

        return NoContent();
    }
}