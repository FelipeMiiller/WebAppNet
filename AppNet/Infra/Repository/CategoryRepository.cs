using Microsoft.EntityFrameworkCore;
using AppNet.Infra.DataBase;
using AppNet.Model;


namespace AppNet.Infra.Repository;

public class CategoryRepository : ICategoryRepository
{
    private readonly Context _context;

    public CategoryRepository(Context context)
    {
        _context = context;
    }

    public async Task NewCategoryAsync(Category category)
    {
      
        _context.Categories.Add(category);
        await _context.SaveChangesAsync();
    }


    public async Task UpdateCategoryAsync(Category category)
    {
        _context.Categories.Update(category);
        await _context.SaveChangesAsync();
    }

    public async Task<Category?> GetCategoryByIdAsync(Guid id)
    {
        return await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<bool> Exists(string nome)
    {
        return await _context.Categories.AnyAsync(c => c.Nome == nome);
    }

    public async Task DeleteCategoryAsync(Guid categoryId)
    {
        var category = await GetCategoryByIdAsync(categoryId);
        if (category != null)
        {
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<List<Category>> GetCategoriesAsync()
    {
        return await _context.Categories.ToListAsync();
    }
}