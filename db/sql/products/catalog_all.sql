select p.*, itp.image_url from product p
left join
image_to_product itp
on itp.product_id = p.id
where (${product_group_id} is null or product_group_id = ${product_group_id}) and show_to_public = true