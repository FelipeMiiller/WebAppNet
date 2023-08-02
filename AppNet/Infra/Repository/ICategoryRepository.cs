using AppNet.Model;


namespace AppNet.Infra.Repository;

public interface ICategoryRepository
{
    Task NewCategoryAsync(Category nome);
    Task UpdateCategoryAsync(Category category);
    Task<Category?> GetCategoryByIdAsync(Guid id);
    Task<bool> Exists(string nome);
    Task DeleteCategoryAsync(Guid categoryId);
    Task<List<Category>> GetCategoriesAsync();
}