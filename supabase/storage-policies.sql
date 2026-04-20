-- Enable RLS on storage.objects
alter table storage.objects enable row level security;

-- Allow only authenticated users to insert and select their own files
create policy "Allow users to upload and view their own files" on storage.objects
  for all
  to authenticated
  using (
    bucket_id = 'artworks' and (auth.uid() = owner)
  );
