using AppNet.Infra.Repository;
using AppNet.Model;
using AppNet.Request;
using Microsoft.AspNetCore.Mvc;

namespace AppNet.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;


    public CategoryController(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] NewCategory request)
    {
        if (!await _categoryRepository.Exists(request.nome)) return BadRequest("Category already exists! ");

        await _categoryRepository.NewCategoryAsync(new Category(request.nome));

        return Created("create", "Created.");
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategory(Guid id)
    {
        var category = await _categoryRepository.GetCategoryByIdAsync(id);
        if (category == null) return NotFound();
        return Ok(category);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateCategory request)
    {
        var category = await _categoryRepository.GetCategoryByIdAsync(request.id);
        if (category == null) return NotFound();

        category.Nome = request.nome;

        await _categoryRepository.UpdateCategoryAsync(category);
        return Ok(category);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var category = await _categoryRepository.GetCategoryByIdAsync(id);
        if (category == null) return NotFound();

        await _categoryRepository.DeleteCategoryAsync(id);
        return NoContent();
    }
}