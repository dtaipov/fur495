select p.id, p.name, p.price
 from
 product p
where
 p.service = true and
 p.show_to_public = true
order by p.name